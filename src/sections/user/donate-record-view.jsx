'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { DataTablePro } from '@/components/dataTablePro'
import { formatNumberWithCommas } from '@/utils/format'
import { palette } from '@/style/config'
import donateHistoryService from '@/services/user/history'

function DonateRecordView() {
  // eslint-disable-next-line no-unused-vars
  const [dataList, setDataList] = useState([])

  const columns = useMemo(
    () => [
      {
        header: '日期',
        accessorKey: 'order_date',
        id: 'order_date',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.order_date}
            </p>
          )
        },
      },
      {
        header: '時間',
        accessorKey: 'order_datetime',
        id: 'order_datetime',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.order_datetime}
            </p>
          )
        },
      },
      {
        header: '金額',
        accessorKey: 'amount',
        id: 'amount',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-primary-600 lg:desktop-regular-p">
              {`$${formatNumberWithCommas(row.original.amount)}`}
            </p>
          )
        },
      },
      {
        header: '祈福項目',
        accessorKey: 'item_name',
        id: 'item_name',
        width: 25,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.item_name}
            </p>
          )
        },
      },
      {
        header: '付款方式',
        accessorKey: 'pay_type_name',
        id: 'pay_type_name',
        width: 20,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.pay_type_name}
            </p>
          )
        },
      },
      {
        header: '訂單編號',
        accessorKey: 'trade_no',
        id: 'trade_no',
        width: 20,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.trade_no}
            </p>
          )
        },
      },
      {
        header: '收據編號',
        accessorKey: 'receipt_no',
        id: 'receipt_no',
        width: 20,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="mobile-regular-h5 text-dark-700 lg:desktop-regular-p">
              {row.original.receipt_no}
            </p>
          )
        },
      },
    ],
    []
  )

  const fetchData = useCallback(async () => {
    const payload = {
      Page: null,
      Limit: null,
    }
    const response = await donateHistoryService(payload)
    const {
      data: { list },
    } = response

    setDataList(list)
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-3">
      {/* Table Result */}
      <DataTablePro
        loading={false}
        headerRowSx={{
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          backgroundColor: '#975409',
          color: palette.common.white,
        }}
        tableMinWidth={1000}
        tbodyHeight={600}
        data={dataList}
        columns={columns}
        pageSizeList={[30, 50, 100]}
        defaultSortBy={[{ id: 'donate_datetime', desc: true }]}
      />
    </div>
  )
}

export default DonateRecordView

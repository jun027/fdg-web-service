import MainLayout from '@/layouts/main'
import ThumbnailLayout from '@/layouts/thumbnail'
import { NoteFoundView } from '@/sections/note-found'

export default function NotFound() {
  return (
    <MainLayout>
      <ThumbnailLayout title="恆春郡福德宮">
        <NoteFoundView />
      </ThumbnailLayout>
    </MainLayout>
  )
}

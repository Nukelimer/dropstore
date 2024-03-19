import { create } from 'zustand'



interface AppState {
    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void

    isRenameModalOpen: boolean
    setIsRenameModalOpen: (open: boolean) => void

    fileId: string | null
    setFileId: (fileId: string) => void

    filename: string
    setFileName: (fileId: string) => void
}
  


export const useAppStore = create<AppState>()((set) => ({
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),
    

    filename: '',
    setFileName: (filename: string) => set((state) => ({ filename })),
    

    fileId: null,
    setFileId: (fileId: string)=>set((state)=>({fileId})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open)=>set((state)=>({isRenameModalOpen: open}))

}))
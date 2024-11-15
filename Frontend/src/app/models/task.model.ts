export interface ITaskView {
    taskId: number
    title: string
    description: string
    dueDate: string
    isCompleted: boolean
    isRecordActive: boolean
    createdAt: string
    modifiedAt: string
}


export interface ITaskPost {
    taskId: number
    title: string
    description: string
    dueDate: string
    isCompleted: boolean
}


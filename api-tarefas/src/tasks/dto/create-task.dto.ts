export class CreateTaskDto {
  title: string;
  description: string;
  userId: number;
  dueDate?: string;
  completedDate?: string;
}

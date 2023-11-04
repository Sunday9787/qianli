export class JobDTO {
  title: string
  num: number
  department_id: number
  city: string
  requirement: string
  responsibility: string
}

export class JobEditDTO extends JobDTO {
  id: number
}

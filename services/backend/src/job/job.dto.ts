export class JobDTO {
  job: string
  num: number
  department_id: number
  city: string
  requirement: string
  responsibility: string
}

export class JobUpdateDTO extends JobDTO {
  id: number
}

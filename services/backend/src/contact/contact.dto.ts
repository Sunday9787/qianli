export class ContactDTO {
  label: string
  value: string
  desc: string
}

export class ContactEditDTO extends ContactDTO {
  id: number
}

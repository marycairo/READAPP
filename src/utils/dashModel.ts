export type DashJSON = {
  numero: number
  nombre: string
}

export class DashModel {
  constructor(public numero: number = 0, public nombre: string = '') {}

  static fromJson(dashJson: DashJSON): DashModel {
    return Object.assign(new DashModel(), dashJson)
  }
}

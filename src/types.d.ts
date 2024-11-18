export type CardId = string
export type CardTitle = string
export type CardColumn = 'new' | 'todo' | 'process' | 'completed'

export interface Card {
  id: CardId
  title: CardTitle
  column: CardColumn
}

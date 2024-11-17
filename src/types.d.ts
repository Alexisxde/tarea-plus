export type CardId = string
export type CardColumn = 'new' | 'todo' | 'process' | 'completed'

export interface Card {
  id: CardId
  title: string
  column: Column
}

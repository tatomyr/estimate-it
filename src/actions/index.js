import { CHANGE_TEXT, EDITOR_BLUR } from './types'

export const changeText = text => ({
  type: CHANGE_TEXT,
  text,
})

export const editorBlur = () => ({
  type: EDITOR_BLUR,
})

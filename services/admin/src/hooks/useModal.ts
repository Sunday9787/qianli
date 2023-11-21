interface Options {
  label: string
  submit(): void | Promise<void>
  open?(): void | Promise<void>
}

type Type = 'action:visible' | 'action:hidden' | 'action:submit'

type Mode = 'update' | 'create'

export function useModal(options: Options) {
  const message = useMessage()
  const actionType = shallowReadonly({
    open: 'action:visible',
    close: 'action:hidden',
    submit: 'action:submit'
  })

  const modal = shallowReactive({
    visible: false,
    mode: 'update' as Mode,
    actionType,
    action
  })

  const successText = computed(function () {
    return options.label + (modal.mode === 'create' ? '添加成功' : '编辑完成')
  })

  async function action(type: Type) {
    switch (type) {
      case actionType.open:
        modal.visible = true
        options.open?.apply(null)
        break
      case actionType.close:
        modal.visible = false
        break
      case actionType.submit:
        await options.submit()
        message.success(successText.value)
        modal.mode = 'create'
    }
  }

  return modal
}

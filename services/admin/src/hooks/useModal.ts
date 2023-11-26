interface Options {
  label: string
  submit(): void | Promise<void>
  open?(): void | Promise<void>
}

type Type = 'action:visible' | 'action:hidden' | 'action:submit'

type Mode = 'update' | 'create' | 'view'

enum ActionType {
  open = 'action:visible',
  close = 'action:hidden',
  submit = 'action:submit'
}

export function useModal(options: Options) {
  const message = useMessage()

  const modal = shallowReactive({
    visible: false,
    mode: 'create' as Mode,
    get disabled() {
      return modal.mode === 'view'
    },
    action,
    get title() {
      return (modal.mode === 'create' ? '添加' : '编辑') + options.label
    }
  })

  const successText = computed(function () {
    return options.label + (modal.mode === 'create' ? '添加成功' : '编辑完成')
  })

  async function action(type: Type) {
    switch (type) {
      case ActionType.open:
        modal.visible = true
        options.open?.apply(null)
        break
      case ActionType.close:
        modal.visible = false
        setTimeout(function () {
          modal.mode = 'create'
        }, 0)
        break
      case ActionType.submit:
        await options.submit()
        message.success(successText.value)
        modal.action('action:hidden')
    }
  }

  return modal
}

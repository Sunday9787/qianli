import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    size: {
      type: [String, Array],
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [width, height] = (function () {
      if (props.size instanceof Array) {
        return props.size as [string, string]
      }

      if (typeof props.size === 'string' || typeof props.size === 'number') {
        return [props.size, props.size]
      }

      return ['1em', '1em']
    })()

    return { width, height }
  },
  render() {
    return (
      <svg aria-hidden='true' width={this.width} height={this.height}>
        <use xlinkHref={`#${this.prefix}-${this.name}`} fill='currentColor' />
      </svg>
    )
  }
})

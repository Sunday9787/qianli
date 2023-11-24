<template>
  <n-space class="app-form-collapse" :style="collapseStyle" :wrap-item="false">
    <div class="app-form-collapse__content">
      <slot />
    </div>

    <div class="app-form-collapse__action">
      <n-space>
        <slot name="action" />
      </n-space>

      <transition name="fade">
        <n-el v-show="showToggleCollapse">
          <n-text
            class="flex items-center gap-x-1"
            style="height: var(--height-medium)"
            tag="a"
            size="small"
            href="javascript:;"
            @click="toggleCollapse()"
          >
            <n-icon size="20">
              <KeyboardArrowUpFilled v-if="open" />
              <KeyboardArrowDownFilled v-else />
            </n-icon>
            {{ text }}</n-text
          >
        </n-el>
      </transition>
    </div>
  </n-space>
</template>

<script lang="ts">
import { getCurrentInstance, ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash-es'
import { KeyboardArrowUpFilled, KeyboardArrowDownFilled } from '@vicons/material'
import { useSystemModule } from '@/store/modules/system'

function useFormCollapse(height: number) {
  const maxHeight = ref(height)
  const open = ref(false)
  const vm = getCurrentInstance()?.proxy
  const resizeHandle = debounce(function (e?: UIEvent) {
    setTimeout(function () {
      maxHeight.value = vm?.$el.scrollHeight
    }, 210)
    if (e) open.value = false
  })

  onMounted(resizeHandle)
  onBeforeUnmount(function () {
    window.removeEventListener('resize', resizeHandle)
  })

  window.addEventListener('resize', resizeHandle)

  return { maxHeight, open }
}

export default {
  name: 'AppFormCollapse',
  components: {
    KeyboardArrowUpFilled,
    KeyboardArrowDownFilled
  },
  props: {
    visible: Boolean,
    height: {
      type: Number,
      default: 34
    }
  },
  setup(props) {
    const { maxHeight, open } = useFormCollapse(props.height)
    const systemModule = useSystemModule()

    systemModule.$subscribe(function (mutation) {
      if (!Array.isArray(mutation.events)) {
        mutation.events.key === 'collapse'
        setTimeout(function () {
          window.dispatchEvent(new Event('resize'))
        }, 300)
      }
    })

    return { maxHeight, open }
  },
  computed: {
    text() {
      return this.open ? '收起' : '展开'
    },
    collapseStyle() {
      return {
        height: this.open ? this.maxHeight + 'px' : this.height + 'px'
      }
    },
    showToggleCollapse() {
      return this.height < this.maxHeight
    }
  },
  methods: {
    toggleCollapse() {
      this.open = !this.open
      this.$emit('change', this.open)
    }
  },
  watch: {
    visible(val) {
      if (this.maxHeight) return
      if (val) window.dispatchEvent(new Event('resize'))
    }
  }
}
</script>

<style lang="less">
@width: 190px;

.app-form-collapse {
  position: relative;
  padding-right: @width;
  overflow: hidden;
  width: 100%;
  transition-duration: 0.2s;
}

.app-form-collapse__content {
  position: relative;
  width: 100%;
}

.app-form-collapse__action {
  position: absolute;
  right: 0;
  @apply flex;
  @apply items-start;
  column-gap: 5px;
  width: @width;
  height: 100%;
}
</style>

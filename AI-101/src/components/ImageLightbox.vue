<template>
  <div class="lightbox-backdrop" @click="$emit('close')">
    <div class="lightbox-dialog" @click.stop>
      <button type="button" class="lightbox-close" aria-label="Close image preview" @click="$emit('close')">✕</button>
      <img :src="src" :alt="alt" class="lightbox-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageLightbox',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
}
</script>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 12, 10, 0.78);
  backdrop-filter: blur(6px);
}

.lightbox-dialog {
  position: relative;
  max-width: min(1100px, 100%);
  max-height: min(88vh, 100%);
}

.lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: rgba(10, 12, 10, 0.72);
  color: #fff;
  cursor: pointer;
}

.lightbox-image {
  display: block;
  max-width: 100%;
  max-height: 88vh;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  object-fit: contain;
  background: #fff;
}

@media (max-width: 640px) {
  .lightbox-backdrop {
    padding: 16px;
  }

  .lightbox-close {
    top: 8px;
    right: 8px;
  }
}
</style>

<template>
  <section class="section">
    <div class="container">
      <h3 class="h3">
        {{ $t('desc10') }}
      </h3>

      <div class="video-wrapper" :class="{ 'video-playing': isVideoPlaying }">
        <img
          class="video-wrapper__img"
          src="/images/video-poster.png"
          width="792"
          height="444"
          @click="playVideo"
          v-if="!isVideoPlaying"
        >
        <video controls ref="videoElement">
          <source src="/images/sample-5s.mp4">
          <a href="https://1drv.ms/u/s!AuCV_lt33VoHiad7qrHRE1ZDCDMHDA?e=kEilU7">{{ $t('desc40') }}</a>.
        </video>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isVideoPlaying: false
    };
  },
  methods: {
    playVideo() {
      const video = this.$refs.videoElement;
      video.play();
      this.isVideoPlaying = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';
.section {
  padding: 64px 0;
  background: #E2EDF1;
}
.h3 {
  text-align: center;
}

.video-wrapper {
  position: relative;
  max-width: 790px;
  height: auto;
  margin-inline: auto;
  border-radius: 16px;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 64px;
    height: 64px;
    background: url("/src/assets/images/audio-play.svg");
    pointer-events: none;
    transition: .2s;
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  video {
    width: 100%;
    height: 100%;
  }

  &.video-playing {
    &::after {
      opacity: 0;
    }
    .video-wrapper__img {
      opacity: 0;
    }
  }
}

@media (max-width: $mobile) {
  .section {
    padding: 24px 0;
  }
  .video-wrapper {
    &:after {
      width: 48px;
      height: 48px;
      background-size: contain;
    }
  }
}

</style>

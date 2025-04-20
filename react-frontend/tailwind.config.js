module.exports = {
    theme: {
      extend: {
        keyframes: {
          fadeSlide: {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          fade: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
          blinkCaret: {
            '0%,100%': { borderColor: 'transparent' },
            '50%': { borderColor: 'black' },
          },
        },
        animation: {
          'fade-slide': 'fadeSlide 0.6s ease-out forwards',
          'fade-in': 'fade 0.6s ease-out forwards',
          'slide-up': 'fadeSlide 0.6s ease-out forwards',
          'blink-caret': 'blinkCaret 1s step-end infinite',
        },
      },
    },
  };
  module.exports = {
    theme: {
      extend: {
        keyframes: {
          spinIn: {
            '0%': { opacity: 0, transform: 'rotate(-180deg) scale(0.5)' },
            '100%': { opacity: 1, transform: 'rotate(0deg) scale(1)' },
          },
          slideUpSmooth: {
            '0%': { opacity: 0, transform: 'translateY(60px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          fade: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
          blinkCaret: {
            '0%,100%': { borderColor: 'transparent' },
            '50%': { borderColor: 'black' },
          },
        },
        animation: {
          'spin-in': 'spinIn 0.8s ease-out forwards',
          'slide-up-smooth': 'slideUpSmooth 0.7s ease-out forwards',
          'fade-in': 'fade 0.6s ease-out forwards',
          'blink-caret': 'blinkCaret 1s step-end infinite',
        },
      },
    },
  };
  
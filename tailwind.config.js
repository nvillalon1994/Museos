module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'color1-nav':'#2CDCB2',
        'color2-backg':'#E1FEF7',
        'color3-publicacion':'#CBF9EE',
        'color4-comentarios':'#7AF6D9',
        'colo5-phone-gray':'#404040',
        'colo6-phone-oringe':'#e48735',
        'colo7-phone-dark':'#4f4f4f',
        

      }
    },
    flex:{
      '2':'0 0 45%'
    }
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
  
}
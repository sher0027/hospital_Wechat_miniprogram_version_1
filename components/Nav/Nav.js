// components/Nav/Nav.js
const app = getApp()
Component({
  properties: {
    title: { type: String, value: "" },
  },
  methods: {
    back() {
      wx.navigateBack()
    },
  }
})

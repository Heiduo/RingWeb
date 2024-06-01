import Html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

const PADDING = 6
const A4_PAPER_SIZE_ENUM = {
  width: 595.28,
  height: 841.89
}

export function exportAsImg(toast, selector, filename) {
  const cloneEle = cloneElement(toast, selector)
  if (!cloneEle) return Promise.reject()
  const { warp, cleanHtmlRecover } = cleanHtml(cloneEle, filename)

  return new Promise((resolve) => {
    Html2canvas(warp, { useCORS: true })
      .then((canvas) => {
        const a = document.createElement('a')
        const event = new MouseEvent('click')
        a.download = filename
        a.href = canvas.toDataURL('image/png')
        a.dispatchEvent(event)
        return canvas.toBlob(blob => {
          resolve(blob)
        }, 'image/png')
      })
      .finally(() => {
        typeof toast.hide === 'function' && toast.hide()
        cleanHtmlRecover()
      })
  })
}

export function exportAsPdf(toast, selector, filename) {
  const cloneEle = cloneElement(toast, selector)
  if (!cloneEle) return Promise.reject()
  const { warp, cleanHtmlRecover } = cleanHtml(cloneEle, filename)
  return new Promise((resolve) => {
    Html2canvas(warp, { useCORS: true })
      .then((canvas) => generatePDF(canvas, filename))
      .finally(() => {
        cleanHtmlRecover()
        resolve()
        typeof toast.hide === 'function' && toast.hide()
      })
  })
}

function cloneElement(toast, selector) {
  const ele = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!ele) return

  typeof toast.show === 'function' && (toast.show())
  const cloneEle = ele.cloneNode(true)
  const { width, height } = ele.getBoundingClientRect()
  // cloneEle.style.width = `${width}px`
  // cloneEle.style.height = `${height}px`
  cloneEle.style.padding = `${PADDING}px`
  cloneEle.style.border = 'none'
  cloneEle.style.boxShadow = 'none'
  return cloneEle
}
function cleanHtml(ele, filename) {
  // const selectElements = ele.querySelectorAll('select')
  // selectElements.forEach((sel) => (sel.style.display = 'none'))
  // ele.firstElementChild?.remove()
  // ele.prepend(title)
  const navBar = ele.querySelector('.top-nav-bar')
  navBar.remove()
  const warp = document.createElement('div')
  // 图片、pdf导出背景色不是白色
  warp.style.position = 'absolute'
  warp.style.background = '#222222'
  warp.style.top = '0'
  warp.style.left = '0'
  warp.style.zIndex = '-1'
  warp.append(ele)
  document.body.append(warp)
  return {
    warp,
    cleanHtmlRecover: () => {
      warp.remove()
    }
  }
}

function generatePDF(canvas, filename) {
  // html页面生成的canvas在pdf中图片的宽高
  const contentWidth = canvas.width
  const contentHeight = canvas.height
  // 一页pdf显示html页面生成的canvas高度
  const pageHeight = (contentWidth / A4_PAPER_SIZE_ENUM.width) * A4_PAPER_SIZE_ENUM.height
  // 未生成pdf的html页面高度
  let leftHeight = contentHeight
  // 页面偏移
  let position = 0
  const imgWidth = A4_PAPER_SIZE_ENUM.width
  const imgHeight = (A4_PAPER_SIZE_ENUM.width / contentWidth) * contentHeight
  const pageData = canvas.toDataURL('image/jpeg', 1.0)
  const PDF = new JsPDF('p', 'pt', 'a4')

  // 当内容未超过pdf一页显示的范围，无需分页
  if (leftHeight < pageHeight) {
    // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
  } else {
    // 超过一页时，分页打印（每页高度841.89）
    while (leftHeight > 0) {
      PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      leftHeight -= pageHeight
      position -= A4_PAPER_SIZE_ENUM.height
      if (leftHeight > 0) {
        PDF.addPage()
      }
    }
  }
  PDF.save(filename + '.pdf')
  return PDF
}

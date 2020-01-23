const width = 500
const height = 500

// x0, y0, x1, y1, x2, y2, x3, y3
function quadBez(p0, p1, p2, t)
{
    return (
        (1 - t) ** 2 * p0
        + 2 * t * (1 - t) * p1
        + t ** 2 * p2
    )
}
function cubBez(p0, p1, p2, p3, t)
{
    return (
        (1 - t) ** 3 * p0
        + 3 * t * (1 - t) ** 2 * p1
        + 3 * t ** 2 * (1 - t) * p2
        + t ** 3 * p3
    )
}

const ctx = document.getElementById('canvas').getContext('2d')
const points0 = document.getElementById('p0')
const points1 = document.getElementById('p1')
const points2 = document.getElementById('p2')

ctx.lineWidth = 2
ctx.fillStyle = "red"

function drawQuad(x0, y0, x1, y1, x2, y2) {  
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    let x, y
    for (let t = 0; t <= 1; t += 0.01) {
        x = quadBez(x0, x1, x2, t)
        y = quadBez(y0, y1, y2, t)
        ctx.lineTo(x, y)
    }
    ctx.stroke()

    console.log(x0, y0)
    ctx.fillRect(x0, y0 - 10, 10, 10)
    ctx.fillRect(x1, y1, 10, 10)
    ctx.fillRect(x2 - 10, y2 - 10, 10, 10)
}

function getPoints(pEl) {
    const pointsStr = pEl.value
    if (pointsStr === '') {
        return [-1, -1]
    } else {
        const points = pointsStr.split(',')
        const x = +points[0]
        const y = +points[1]
        return [x, y]
    }
}
const isEmpty = p => p === -1
function repaint() {
    const [x0, y0] = getPoints(points0)
    const [x1, y1] = getPoints(points1)
    const [x2, y2] = getPoints(points2)
    console.log(x0, y0, x1, y1, x2, y2)
    if (
        isEmpty(x0) || isEmpty(y0)
        || isEmpty(x1) || isEmpty(y1)
        || isEmpty(x2) || isEmpty(y2)
    ) return

    ctx.clearRect(0, 0, width, height)
    drawQuad(x0, y0, x1, y1, x2, y2)
}

document.getElementById('repaintButton').addEventListener('click', repaint)
document.getElementById('fastFill').addEventListener('click', () => {
   points0.value = `0, ${height}`
   points1.value = `${width / 2}, 0`
   points2.value = `${width}, ${height}`
})
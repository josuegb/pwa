const APIKEY = ''
const main = document.querySelector('main')
const sourceSelector = document.querySelector('#sourceSelector')
const defaultSource = 'the-washington-post'

window.addEventListener('load', async () => {
  updateNews()
  await updateSources()
  sourceSelector.value = defaultSource

  sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value)
  })
})

async function updateSources() {
  const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${APIKEY}`)
  const json = await res.json()

  sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n')
}

async function updateNews(source = defaultSource) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${APIKEY}`
  )
  const json = await res.json()

  main.innerHTML = json.articles.map(createArticle).join('\n')
}

function createArticle(article) {
  return `<div class="article">
            <a href="${article.url}">
              <h2>${article.title}</h2>
              <img src="${article.urlToImage}">
              <p>${article.description}</p>
            </a>
          </div>`
}

import { getAllLaunches, getCompany, getLaunches, getRocket } from "./service"

const header = document.querySelector('#header')
const divApp = document.querySelector('#app')
const divSel = document.querySelector('#select')
const btNext = document.querySelector('#next')

const Header = (data) => {
    const pHname = document.createElement('p')
    pHname.textContent = data.name
    const pHdate = document.createElement('p')
    pHdate.textContent = data.founded
    const pHloc = document.createElement('p')
    pHloc.textContent = `Adresa: '${data.headquarters.address}',   Grad: '${data.headquarters.city}',   Drzava: '${data.headquarters.state}'`
    header.append(pHname, pHdate, pHloc)

}

getCompany().then(res => {
    console.log(res.data)
    Header(res.data)
})

let AllSatelites = []
let SatelitesOnDom = []

const Star = (el) => {
    const pName = document.createElement('p')
    pName.textContent = el.spaceTrack.TLE_LINE0
    const pVersion = document.createElement('p')
    pVersion.textContent = el.version
    const divContent = document.createElement('div')
    divContent.append(pName, pVersion)
    return divContent
}

const Stars = (arr) => {
    return arr.map(el => Star(el))
}

const SelectF = (arr) => {
    divSel.innerHTML = ''
    let selArr = new Set(arr.map(el => el.version))
    console.log(selArr)
    const select = document.createElement('select')
    const optDef = document.createElement('option')
    optDef.value = '-1'
    optDef.selected = true
    optDef.disabled = true
    optDef.hidden = true
    optDef.textContent = 'Chose version'
    select.prepend(optDef)
    selArr.forEach(el => {
        const opt = document.createElement('option')
        opt.value = `${el}`
        opt.textContent = el
        select.append(opt)
    })
    divSel.append(select)

    select.addEventListener('change', (e) => {
        divApp.innerHTML = ''
        SatelitesOnDom = arr.filter(el => el.version == e.target.value)
        divApp.append(...Stars(SatelitesOnDom))
    })
}

const Launch = (el) => {
    const pLaunch = document.createElement('p')
    pLaunch.innerHTML = el.name
    const img = document.createElement('img')
    img.src = el.links.patch.small
    img.width = 100
    img.height = 100
    const divLaunchCont = document.createElement('div')
    divLaunchCont.append(pLaunch, img)
    return divLaunchCont
}

const Rocket = (arr, id) => {
    let y = '5e9d0d95eda69955f709d1eb'  ///uzeo sam proizvoljan id
    let rock = arr.filter(el => el.id == y)
    // arr.filter(el => el.id == id) ne radi, a dodao sam parametar da mi vuce id iz satelita
    console.log(arr.filter(el => el.id == y)) // ne znam zasto mi ne nalazi id..pokazuje mi za sva 4 false
    const imgRock = document.createElement('img')
    const Rname = document.createElement('p')
    Rname.textContent = rock[0].name
     imgRock.src = rock[0].flickr_images[0]
     imgRock.width=100
     imgRock.height=100
    divApp.append(Rname,imgRock)
}

getAllLaunches().then(res => { //ovo su sateliti
    AllSatelites = res.data
    SatelitesOnDom = res.data
    console.log(res.data[0].version)

    divApp.append(...Stars(AllSatelites))
    SelectF(AllSatelites)
})

btNext.addEventListener('click', () => {
    getLaunches().then(res => {
        divApp.innerHTML = ''
        console.log(res.data.id)
        var id = res.data.id
        divApp.append(Launch(res.data))

        getRocket().then(res => {
            console.log(res.data)
            Rocket(res.data, id)
        })
    })
})
var firebaseConfig = {
    apiKey: "AIzaSyDIFsqezhF09J-Q2lDwZvtA_DfhBpJnCWM",
    authDomain: "devmytools-db.firebaseapp.com",
    databaseURL: "https://devmytools-db-default-rtdb.firebaseio.com",
    projectId: "devmytools-db",
    storageBucket: "devmytools-db.appspot.com",
    messagingSenderId: "1034664578912",
    appId: "1:1034664578912:web:82a3c85d45db93e32a1805",
    measurementId: "G-VFM40KYYVP"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

function dados(tabela) {

    let retDados = {}

    let campos = document.getElementsByClassName(tabela)
    for (let idx in campos){
        if(campos[idx].className !== undefined) {
            retDados[campos[idx].name] = campos[idx].value    
        }
    }

    return retDados
    
}

async function inserir(tabela) {

    firebase.database().ref().child('leandro/' + tabela).push(dados(tabela))

}

async function deletar(tabela, registro) {

    firebase.database().ref().child('leandro/' + tabela + '/' + registro).remove()

}

async function alterar(tabela, registro) {

    firebase.database().ref().child('leandro/' + tabela + '/' + registro).update(dados(tabela))

}

function relatar(tabela) {
    
    firebase.database().ref('leandro/' + tabela)
        .orderByChild('nome').on('value', (snapshot) => {
        
        let table = document.getElementById('table_' + tabela)
        table.innerHTML = ''

        let tr = document.createElement('tr')
        let th = []
        
        th[0] = document.createElement('th')
        th[0].appendChild(document.createTextNode('uid'))
        
        tr.appendChild(th[0])

        let num = 1
        for(let campo in dados(tabela)) {
            
            th[num] = document.createElement('th')
            th[num].appendChild(document.createTextNode(campo))
            
            tr.appendChild(th[num])
            num += 1
        }
        
        table.appendChild(tr)

        snapshot.forEach((item) => {

            let tr = document.createElement('tr')
            let td = []
            
            td[0] = document.createElement('td')
            td[0].appendChild(document.createTextNode(item.key))

            tr.appendChild(td[0])

            let num = 1
            for(let campo in dados(tabela)) {
                
                td[num] = document.createElement('td')
                td[num].appendChild(document.createTextNode(item.val()[campo]))

                tr.appendChild(td[num])
                
                num += 1
            }

            table.appendChild(tr)
        })

    }) 

}


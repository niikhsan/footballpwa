import database from './database.js';

const getAllTeam = () => {
    //Get All Bookmark Team From Database
    database.getTeam()
    .then(data => {
        let teamsHTML = '';
        data.forEach(team => {
            teamsHTML  +=
            `
            <div class="col s12 m8 l6">
            <div class="card z-depth-3">
            <div class="card-content center-align">    
            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
            <div class="information-team">
            <span class="deep-orange darken-1 title-team"><strong>${team.name}</strong></span>
            <span>${team.venue}</span>
            </div>
            </div>
            <div class="card-action right-align">
            <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
            <button onclick="deleteBookmarkTeam(${team.id},'${team.name}')" class="waves-effect waves-light red btn-small accent-3">REMOVE</button>
            </div>
            </div>
            </div>
            `
        })
            //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none';
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML;
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addBookmarkTeam = (id,logo,name,venue,website) => {
    //Add To Database
    database.addTeam({id,logo,name,venue,website});
    //Display Toast
    M.toast({html: `Berhasil Bookmark ${name}`, classes: 'rounded'});
    //Push Notification
    pushNotification(`Berhasil Bookmark ${name}`);
}

const deleteBookmarkTeam = (id,name) => {
    //Conform Delete Bookmark ?
    let imSure = confirm(`Apakah Anda Yakin ingin menghapus ${name} dari Bookmark ?`);
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id);
        //Fetch All Team
        getAllTeam();
        //Display Toast
        M.toast({html: `Berhasil Menghapus ${name}`, classes: 'rounded'});
        //Push Notification
        pushNotification(`Berhasil Menghapus ${name}`);
    }
    
}

export default {
    addBookmarkTeam,
    getAllTeam,
    deleteBookmarkTeam
}
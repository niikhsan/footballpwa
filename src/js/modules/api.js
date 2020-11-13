const base_url = 'https://api.football-data.org';
const api_token = 'd327b3f79ad54560ac84595be3610b21';

let status = res => {
    if(res.status !== 200){
        console.log(`Error : ${res.status}`);
        return Promise.reject(new Error(res.statusText()));
    }else{
        return Promise.resolve(res);
    }
}

const getStandings = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/standings`)
        .then(res => {
            if(res){
                res.json()
                .then(data => {
                    let standingsHTML = '';
                    data = data.standings[0].table;

                    data.forEach(dataTeam => {
                        let urlTeamImage = dataTeam.team.crestUrl;
                        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
                        standingsHTML +=
                        `
                        <tr>
                        <td>${dataTeam.position}</td>
                        <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                        <td>${dataTeam.team.name}</td>
                        <td>${dataTeam.playedGames}</td>
                        <td>${dataTeam.won}</td>
                        <td>${dataTeam.draw}</td>
                        <td>${dataTeam.lost}</td>
                        <td>${dataTeam.goalsFor}</td>
                        <td>${dataTeam.goalsAgainst}</td>
                        <td>${dataTeam.goalDifference}</td>
                        <td>${dataTeam.points}</td>
                        </tr>
                        `
                    })
                    document.getElementById('progress').style.display = 'none';
                    document.getElementById('standings').innerHTML = standingsHTML;
                })
                .catch(err => console.log(err));
            }
        })
        
    }
    
    fetch(`${base_url}/v2/competitions/${leagueID}/standings`,{
        headers:{
            'X-Auth-Token' : api_token
        }
    })
    .then(status)
    .then(res => res.json())
    .then(data => {
        let standingsHTML = '';
        data = data.standings[0].table;

        data.forEach(dataTeam => {
            let urlTeamImage = dataTeam.team.crestUrl;
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            standingsHTML +=
            `
            <tr>
            <td class="center-align">${dataTeam.position}</td>
            <td class="center-align"><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
            <td>${dataTeam.team.name}</td>
            <td class="center-align">${dataTeam.playedGames}</td>
            <td class="center-align">${dataTeam.won}</td>
            <td class="center-align">${dataTeam.draw}</td>
            <td class="center-align">${dataTeam.lost}</td>
            <td class="center-align">${dataTeam.goalsFor}</td>
            <td class="center-align">${dataTeam.goalsAgainst}</td>
            <td class="center-align">${dataTeam.goalDifference}</td>
            <td class="center-align">${dataTeam.points}</td>
            </tr>
            `
        })
        document.getElementById('progress').style.display = 'none';
        document.getElementById('standings').innerHTML = standingsHTML;
    })
    .catch(err => console.log(err));
}

const getTeams = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/teams`)
        .then(res => {
            if(res){
                res.json()
                .then(data => {
                    let teamsHTML = '';
                    data = data.teams;
                    data.forEach(team => {
                        let urlTeamImage = team.crestUrl;
                        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
                        teamsHTML  +=
                        `
                        <div class="col s12 m8 l6">
                        <div class="card z-depth-3">
                        <div class="card-content center-align">
                        <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%">
                        <div class="information-team">
                        <span class="deep-orange darken-1 title-team"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        </div>
                        </div>            
                        <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button onclick="addBookmarkTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn-small accent-3">BOOKMARK</button>
                        </div>
                        </div>
                        </div>
                        `
                    })
                    document.getElementById('progress').style.display = 'none';
                    document.getElementById('team').innerHTML = teamsHTML;
                })
            }
        })
        
    }
    fetch(`${base_url}/v2/competitions/${leagueID}/teams`,{
        headers : {
            'X-Auth-Token' : api_token
        }
    })
    .then(status)
    .then(res => res.json())
    .then(data => {
        let teamsHTML = '';
        data = data.teams;
        data.forEach(team => {
            let urlTeamImage = team.crestUrl;
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            teamsHTML  +=
            `
            <div class="col s12 m8 l6">
            <div class="card z-depth-3">
            <div class="card-content center-align">
            <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%">
            <div class="information-team">
            <span class="deep-orange darken-1 title-team"><strong>${team.name}</strong></span>
            <span>${team.venue}</span>
            </div>
            </div>
            <div class="card-action right-align">
            <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
            <button onclick="addBookmarkTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn-small accent-3">BOOKMARK</button>
            </div>
            </div>
            </div>
            `
        })
        document.getElementById('progress').style.display = 'none';
        document.getElementById('team').innerHTML = teamsHTML;
    }).catch(err => console.log(err));
}

export default {
    getStandings,
    getTeams
}

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp',
        port:'587',
        secure: false,
        auth:{
            user:'prashantsingh896@gmail.com',
            pass:'wtrfconyzlzzhilm'
        }
    
    },
    google_client_id:'817690390084-d7a91g0srjqt8ovqjkvu3h08pq3p9pks.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;
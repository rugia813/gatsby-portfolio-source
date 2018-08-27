module.exports = {
    en: {
        titles: {
            introduction: 'Introduction',
            experiances: 'Experiance',
            education: 'Education',
            skills: 'Skill',
        },
        experiances: [{
                company: 'Glory',
                period: '2017/09 ~ present',
                title: 'Front-End Developer',
                responsibility: 'Maintain or develop new functionalities for the frontend of lottery web app. The stack is vue.js and some jquery for older projects.',
            },
            {
                company: 'Xct',
                period: '2016/10 ~ 2017/09',
                title: 'Full-Stack Developer',
                responsibility: 'I took parts in two projects, one is a simple web game, and the other is a platform that provides various reports based on data retrieved through other business partner\'s API.',
            },
        ],
        education: [{
                company: 'Institute of Infomation Industry',
                period: '2016/03 ~ 2016/09',
                title: 'Web/Mobile App Develop Training',
            },
            {
                company: 'I-Shou University',
                period: '2005/09 ~ 2009/06',
                title: 'Applied English',
            }
        ]
    },
    cn: {
        titles: {
            introduction: '履歷',
            experiances: '經歷',
            education: '學歷',
            skills: '技能',
        },
        experiances: [{
                company: '遊戲開發商',
                period: '2017/09 ~ 在職中',
                title: '前端工程師',
                responsibility: '維護現有專案及開發新功能',
            },
            {
                company: '極限創意',
                period: '2016/10 ~ 2017/09',
                title: '全端工程師',
                responsibility: '維護現有專案及開發新功能',
            },
        ],
        education: [{
                company: '資策會',
                period: '2016/03 ~ 2016/09',
                title: '網頁行動App開發班',
            },
            {
                company: '義守大學',
                period: '2005/09 ~ 2009/06',
                title: '應用英語系',
            }
        ]
    },
    skills: { //novice, competent, proficient, expert, mastery
        Frontend: {
            HTML: 3,
            CSS: {
                _level: 2,
                Bootstrap: 3,
                Sass: 2,
            },
            Javascript: {
                _level: 4,
                ES6: 4,
                Typescript: 1,
                React: 2,
                Vue: 4,
                npm: 3,
                webpack: 2,
                gulp: 2,
                threejs: 2,
            },
        },
        Backend: {
            PHP: {
                _level: 2,
                Laravel: 3,
                mysql: 3,
            },
            'C#': {
                _level: 2,
                '.Net': 2,
                mssql: 2,
            },
            nginx: 2,
            linux: {
                _level: 2,
                centos: 2
            },
            nodejs: {
                _level: 2,
                socketio: 1
            },
        },
        others: {
            git: 3,
            regex: 3,
        },
    }
}
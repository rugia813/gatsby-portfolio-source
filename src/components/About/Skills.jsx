import React, { Component } from "react";
import "./Skills.scss";

class Skills extends Component {
  constructor() {
    super();
    this.skills = {
      //novice, competent, proficient, expert, mastery
      Frontend: {
        HTML: 3,
        CSS: {
          _level: 2,
          Bootstrap: 3,
          Sass: 2
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
          threejs: 2
        }
      },
      Backend: {
        PHP: {
          _level: 2,
          Laravel: 3,
          mysql: 3
        },
        "C#": {
          _level: 2,
          ".Net": 2,
          mssql: 2
        },
        nginx: 2,
        linux: {
          _level: 2,
          centos: 2
        },
        nodejs: {
          _level: 2,
          socketio: 1
        }
      },
      others: {
        git: 3,
        regex: 3
      }
    };
    this.levels = [
        'no idea',
        'novice',
        'competent',
        'proficient',
        'expert',
        'mastery'
    ]
    this.fa = {
        HTML: 'html5',
        CSS: 'css3-alt',
        Bootstrap: '',
        Sass: 'sass',
        Javascript: 'js',
        ES6: 'js',
        Typescript: 'js',
        React: 'react',
        Vue: 'vuejs',
        npm: 'npm',
        webpack: '',
        gulp: 'gulp',
        threejs: '',
        PHP: 'php',
        Laravel: 'laravel',
        mysql: '',
        'C#': '',
        '.Net': '',
        mssql: '',
        nginx: '',
        linux: 'linux',
        centos: '',
        nodejs: 'node',
        socketio: '',
        git: 'git',
        regex: '',
    }
  }
  render() {
    const build = (node, i) => {
        if (typeof node !== 'number') {
            return (
                <div>
                    <div className={"skill-tile "  + this.levels[node._level]}>
                        {i !== '' && <i className={`fab fa-${(this.fa[i] || 'empire').toLowerCase()}`} style={{ color: "black" }} />}
                        <p className="skill-level">{i}</p>
                    </div>
                    {Object.entries(node).map((e, i) => build(e[1], e[0]))}
                </div>
            )
        } else {
            if (i == '_level') return ('')
            return (
                <div className={"skill-tile "  + this.levels[node]}>
                <i className={`fab fa-${(this.fa[i] || 'empire').toLowerCase()}`} style={{ color: "black" }} />
                  <p className="skill-level">{i}</p>
                </div>
            )        
        }
    }
    const tree = Object.entries(this.skills).map((e, i) => 
        <div className="category">
            <h2>{e[0]}</h2>
            <hr/>
            {build(e[1], '')}
        </div>
    )
    return <div>{tree}</div>;
  }
}

export default Skills;

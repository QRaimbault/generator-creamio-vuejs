'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    this.log(`\nWelcome to the ${chalk.red('CreamIO Vue.js')} generator !\n`);

    const prompts = [
      {
        type: 'list',
        name: 'objectType',
        message: 'What do you want to generate ?',
        choices: ['View', 'Component'],
        default: 0
      },
      {
        type: 'input',
        name: 'objectName',
        message: 'What is the name of your element ?'
      },
      // VIEW PART
      {
        type: 'confirm',
        name: 'createStyle',
        message: 'Should we create a SCSS file for this view ?',
        default: true,
        when: hash => hash.objectType === 'View'
      }
      /* COMPONENT PART
      {
        type: 'confirm',
        name: 'directoryPath',
        message: 'Should we create a SCSS file for this component ?',
        default: true,
        when: hash => hash.objectType === 'Component'
      },
      {
        type: 'confirm',
        name: 'createStyle',
        message: 'Should we create a SCSS file for this component ?',
        default: true,
        when: hash => hash.objectType === 'Component'
      }*/
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    /*
     * VIEW PART
     */
    if (this.props.objectType === 'View') {
      if (this.fs.exists(this.destinationPath('src/views/' + this.props.objectName + '.vue'))) {
        this.env.error('The following file : ' + chalk.red(this.destinationPath('src/views/' + this.props.objectName + '.vue')) + ' already exists.');
        return;
      }
      this.fs.copyTpl(
        this.templatePath('views/_view.vue'),
        this.destinationPath('src/views/' + this.props.objectName + '.vue'),
        {
          name: this.props.objectName,
          createStyle: this.props.createStyle
        }
      );
      // VIEW STYLE
      if (this.props.createStyle === true) {
        if (this.fs.exists(this.destinationPath('src/scss/views/' + this.props.objectName + '.scss'))) {
          this.env.error('The following file : ' + chalk.red(this.destinationPath('src/scss/views/' + this.props.objectName + '.scss')) + ' already exists.');
          return;
        }
        this.fs.copy(
          this.templatePath('views/_style.scss'),
          this.destinationPath('src/scss/views/' + this.props.objectName + '.scss')
        );
      }
    /*
     * COMPONENT PART
     */
    } else if (this.props.objectType === 'Component') {
      this.log('issou');
    }
  }
};

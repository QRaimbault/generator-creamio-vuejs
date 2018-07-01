'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    this.log(
      `\nWelcome to the ${chalk.red('Quentin Raimbault Starter Vue.js')} generator !\n`
    );

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
      },
      {
        type: 'confirm',
        name: 'createTest',
        message: 'Should we create a test file for this view ?',
        default: true,
        when: hash => hash.objectType === 'View'
      },
      // COMPONENT PART
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the module/view name for this component ?',
        default: 'Global',
        when: hash => hash.objectType === 'Component'
      },
      {
        type: 'confirm',
        name: 'createStyle',
        message: 'Should we create a SCSS file for this component ?',
        default: true,
        when: hash => hash.objectType === 'Component'
      },
      {
        type: 'confirm',
        name: 'createTest',
        message: 'Should we create a test file for this view ?',
        default: true,
        when: hash => hash.objectType === 'Component'
      }
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
      if (
        this.fs.exists(
          this.destinationPath('src/views/' + this.props.objectName + '.vue')
        )
      ) {
        this.env.error(
          'The following file : ' +
            chalk.red(
              this.destinationPath('src/views/' + this.props.objectName + '.vue')
            ) +
            ' already exists.'
        );
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
        if (
          this.fs.exists(
            this.destinationPath('src/views/' + this.props.objectName + '.scss')
          )
        ) {
          this.env.error(
            'The following file : ' +
              chalk.red(
                this.destinationPath('src/views/' + this.props.objectName + '.scss')
              ) +
              ' already exists.'
          );
          return;
        }
        this.fs.copy(
          this.templatePath('views/_style.scss'),
          this.destinationPath('src/views/' + this.props.objectName + '.scss')
        );
      }
      // VIEW TEST
      if (this.props.createTest === true) {
        if (
          this.fs.exists(
            this.destinationPath('src/views/' + this.props.objectName + '.spec.js')
          )
        ) {
          this.env.error(
            'The following file : ' +
              chalk.red(
                this.destinationPath('src/views/' + this.props.objectName + '.spec.js')
              ) +
              ' already exists.'
          );
          return;
        }
        this.fs.copyTpl(
          this.templatePath('views/_test.spec.js'),
          this.destinationPath('src/views/' + this.props.objectName + '.spec.js'),
          {
            name: this.props.objectName
          }
        );
      }
      /*
      * COMPONENT PART
      */
    } else if (this.props.objectType === 'Component') {
      if (
        this.fs.exists(
          this.destinationPath(
            'src/components/' +
              this.props.moduleName +
              '/' +
              this.props.objectName +
              '.vue'
          )
        )
      ) {
        this.env.error(
          'The following file : ' +
            chalk.red(
              this.destinationPath(
                'src/components/' +
                  this.props.moduleName +
                  '/' +
                  this.props.objectName +
                  '.vue'
              )
            ) +
            ' already exists.'
        );
        return;
      }
      this.fs.copyTpl(
        this.templatePath('components/_component.vue'),
        this.destinationPath(
          'src/components/' + this.props.moduleName + '/' + this.props.objectName + '.vue'
        ),
        {
          name: this.props.objectName,
          createStyle: this.props.createStyle
        }
      );
      // VIEW STYLE
      if (this.props.createStyle === true) {
        if (
          this.fs.exists(
            this.destinationPath(
              'src/components/' +
                this.props.moduleName +
                '/' +
                this.props.objectName +
                '.scss'
            )
          )
        ) {
          this.env.error(
            'The following file : ' +
              chalk.red(
                this.destinationPath(
                  'src/components/' +
                    this.props.moduleName +
                    '/' +
                    this.props.objectName +
                    '.scss'
                )
              ) +
              ' already exists.'
          );
          return;
        }
        this.fs.copy(
          this.templatePath('components/_style.scss'),
          this.destinationPath(
            'src/components/' +
              this.props.moduleName +
              '/' +
              this.props.objectName +
              '.scss'
          )
        );
      }
      // VIEW TEST
      if (this.props.createTest === true) {
        if (
          this.fs.exists(
            this.destinationPath(
              'src/components/' +
                this.props.moduleName +
                '/' +
                this.props.objectName +
                '.spec.js'
            )
          )
        ) {
          this.env.error(
            'The following file : ' +
              chalk.red(
                this.destinationPath(
                  'src/components/' +
                    this.props.moduleName +
                    '/' +
                    this.props.objectName +
                    '.spec.js'
                )
              ) +
              ' already exists.'
          );
          return;
        }
        this.fs.copyTpl(
          this.templatePath('components/_test.spec.js'),
          this.destinationPath(
            'src/components/' +
              this.props.moduleName +
              '/' +
              this.props.objectName +
              '.spec.js'
          ),
          {
            name: this.props.objectName
          }
        );
      }
    }
  }
};

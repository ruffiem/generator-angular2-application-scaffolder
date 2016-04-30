System.config({
  packages: {
    components: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import('app/main')
.then(null, console.error.bind(console));

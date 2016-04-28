System.config({
  packages: {
    components: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import('components/main')
.then(null, console.error.bind(console));

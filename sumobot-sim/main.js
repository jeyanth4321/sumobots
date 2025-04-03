const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'matter',
      matter: {
        gravity: { y: 0 }, // top-down simulation
        debug: true
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
  const game = new Phaser.Game(config);
  
  let bot1, bot2;
  
  function preload() {
    this.load.image('bot', 'https://labs.phaser.io/assets/sprites/circle.png');
  }
  
  function create() {
    // Arena border (ring out detection later)
    this.matter.world.setBounds();
  
    // Bot 1
    bot1 = this.matter.add.image(200, 300, 'bot').setCircle().setFrictionAir(0.02);
    bot1.setTint(0xff0000);
  
    // Bot 2
    bot2 = this.matter.add.image(600, 300, 'bot').setCircle().setFrictionAir(0.02);
    bot2.setTint(0x0000ff);
  
    // Give bot2 initial velocity
    bot2.setVelocity(-2, 0);
  }
  
  function update() {
    // Simple AI: move bot1 toward bot2
    const angle = Phaser.Math.Angle.Between(bot1.x, bot1.y, bot2.x, bot2.y);
    const speed = 0.05;
  
    bot1.setVelocity(Math.cos(angle) * speed * 60, Math.sin(angle) * speed * 60);
  }
  
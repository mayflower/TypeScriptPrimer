
    import * as matter from 'matter-js';

    /*******************************************************************************************************************
    *   The main class that launches the demo application.
    *******************************************************************************************************************/
    export class MatterDemo
    {
        /** The matter.js engine. */
        private                 engine          :matter.Engine      = null;
        /** The matter.js renderer. */
        private                 render          :matter.Render      = null;
        /** The matter.js world. */
        private                 world           :matter.World       = null;

        /***************************************************************************************************************
        *   Launch the matter-js deno application.
        ***************************************************************************************************************/
        public start() : void
        {
            this.initMatterEngine();
            this.initAndAddBodies();
            this.initMouse();
            this.styleBodyAndCanvas();

            this.runMatterEngine();
        }

        /***************************************************************************************************************
        *   Initializes the matter.js engine.
        ***************************************************************************************************************/
        private initMatterEngine() : void
        {
            this.engine = matter.Engine.create();
            this.render = matter.Render.create(
                {
                    element: document.body,
                    engine: this.engine,
                    options: {
                        wireframes: false,
                    }
                }
            );
            this.world = this.engine.world;
        }

        /***************************************************************************************************************
        *   Initializes all matter.js bodies.
        ***************************************************************************************************************/
        private initAndAddBodies() : void
        {
            const bg :matter.Body = matter.Bodies.rectangle( 400, 300, 800, 600,
                {
                    isSensor: true,
                    isStatic: true,
                    render: {
                        // fillStyle: '#000000',
                        sprite: {
                            texture: 'res/image/bg.jpg',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );
            const group :number = matter.Body.nextGroup( true );
            const catapult :matter.Body = matter.Bodies.rectangle( 400, 520, 320, 20, {} );
            const stack :matter.Composite = matter.Composites.stack(
                250, 150, 2, 6, 0, 0,
                ( x:number, y:number ) :matter.Body => {
                    return matter.Bodies.rectangle( x, y, 50, 50,
                        {
                            render: {
                                sprite: {
                                    texture: 'res/image/stone.png',
                                    xScale:  1.0,
                                    yScale:  1.0,
                                }
                            }
                        }
                    );
                }
            );

            // this.addBodies();

            // add all bodies and constraints to the world
            matter.World.add( this.world, bg );
            matter.World.add( this.world, stack );
            matter.World.add( this.world, catapult );
            matter.World.add(
                this.world,
                matter.Bodies.rectangle(
                    400, 587.5, 800, 25,
                    {
                        isStatic: true,
                        render: {
                            sprite: {
                                texture: 'res/image/ground.png',
                                xScale:  1.0,
                                yScale:  1.0,
                            }
/*
                            fillStyle: '#00000055',
                            strokeStyle: 'transparent',
*/
                        }
                    }
                )
            );
            matter.World.add( this.world, matter.Bodies.rectangle( 250, 555, 20, 50, { isStatic: true } ) );

            matter.World.add( this.world, matter.Bodies.rectangle(
                400,
                535,
                20,
                80,
                {
                    // color: '#ffff00',

                    isStatic: true,
                    collisionFilter: { group: group, category: 0, mask: 0 },
                    render: {
/*
                        visible: true,
                        fillStyle: 'red',
                        strokeStyle: 'blue',
                        lineWidth: 3,
*/
                    }
                }
            ) );

            matter.World.add( this.world, matter.Bodies.circle( 560, 100, 50, {
                density: 0.005,
                render: {
                    sprite: {
                        texture: 'res/image/ball.png',
                        xScale:  1.0,
                        yScale:  1.0,
                    }
                }
            } ) );
            matter.World.add(
                this.world,
                matter.Constraint.create(
                    {
                        bodyA:     catapult,
                        pointB:    matter.Vector.clone( catapult.position ),
                        stiffness: 1.0,
                        length:    0.0
                    }
                )
            );
        }

        /***************************************************************************************************************
        *   Initializes the mouse and links the mouse to the renderer.
        ***************************************************************************************************************/
        private initMouse() : void
        {
            // add mouse control
            const mouse           :matter.Mouse           = matter.Mouse.create( this.render.canvas );
            const mouseConstraint :matter.MouseConstraint = matter.MouseConstraint.create(
                this.engine,
                {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false,
                            lineWidth: 1.0,
                            strokeStyle: '#ff0000',
                        },
                        bodyA: null,
                        bodyB: null,
                        pointA: null,
                        pointB: null,
                        length: 0.0,
                        label: '',
                        damping: 0.0,
                        type: '',
                        id: 0,
                    }
                }
            );
            matter.World.add( this.world, mouseConstraint );
        }

        /***************************************************************************************************************
        *   Sets css for the document body and centers the matter.js canvas inside the body horizontally.
        ***************************************************************************************************************/
        private styleBodyAndCanvas() : void
        {
            document.body.style.margin = '0';
            document.body.style.backgroundColor = '#9f9a94';
            document.body.style.backgroundImage = 'url( res/image/stone.png )';
        }

        /***************************************************************************************************************
        *   Starts the matter.js engine.
        ***************************************************************************************************************/
        private runMatterEngine() : void
        {
            // create the runner and start the engine and the renderer
            const runner:matter.Runner = matter.Runner.create( {} );
            matter.Runner.run( runner, this.engine );
            matter.Render.run( this.render );
        }
    }


    import * as matter from 'matter-js';
    import { Setting } from './Setting';

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
                            texture: Setting.PATH_IMAGE + 'bg.jpg',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );

            const ground :matter.Body = matter.Bodies.rectangle(
                400, 587.5, 800, 25,
                {
                    isStatic: true,
                    render: {
                        sprite: {
                            texture: Setting.PATH_IMAGE + 'ground.png',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );

            const group :number = matter.Body.nextGroup( true );

            const sigsawBody :matter.Body = matter.Bodies.rectangle(
                400, 520, 320, 20, {
                    render: {
                        sprite: {
                            texture: Setting.PATH_IMAGE + 'sigsawBody.png',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );
            const sigsawCenter :matter.Body = matter.Bodies.rectangle(
                400,
                535,
                40,
                80,
                {
                    // color: '#ffff00',

                    isStatic: true,
                    collisionFilter: { group: group, category: 0, mask: 0 },
                    render: {
                        sprite: {
                            texture: Setting.PATH_IMAGE + 'sigsawCenter.png',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );

            const boxes :matter.Body[] = [];
            for ( let col:number = 0; col < 3; ++col )
            {
                for ( let row:number = 0; row < 5; ++row )
                {
                    boxes.push(
                        matter.Bodies.rectangle( 250 + col * 50, 150 + row * 50, 50, 50,
                            {
                                render: {
                                    sprite: {
                                        texture: Setting.PATH_IMAGE + 'box.png',
                                        xScale:  1.0,
                                        yScale:  1.0,
                                    }
                                }
                            }
                        )
                    );
                }
            }

            const mushroom :matter.Body = matter.Bodies.rectangle( 250, 555, 40, 50,
                {
                    isStatic: true,
                    render: {
                        sprite: {
                            texture: Setting.PATH_IMAGE + 'mushroom.png',
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );

            const ball :matter.Body = matter.Bodies.circle( 560, 100, 50, {
                density: 0.005,
                render: {
                    sprite: {
                        texture: Setting.PATH_IMAGE + 'ball.png',
                        xScale:  1.0,
                        yScale:  1.0,
                    }
                }
            } );

            const sigsawLink :matter.Constraint = matter.Constraint.create(
                {
                    bodyA:     sigsawBody,
                    pointB:    matter.Vector.clone( sigsawBody.position ),
                    stiffness: 1.0,
                    length:    0.0,
                    render: {
                        visible: false,
                        lineWidth: 1.0,
                        strokeStyle: '#ff0000',
                    },
                }
            );

            // add all bodies and constraints to the world
            matter.World.add( this.world, bg           );
            matter.World.add( this.world, ground       );
            matter.World.add( this.world, sigsawBody   );
            matter.World.add( this.world, boxes        );
            matter.World.add( this.world, sigsawCenter );
            matter.World.add( this.world, mushroom     );
            matter.World.add( this.world, ball         );
            matter.World.add( this.world, sigsawLink   );
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
                        stiffness: 1.0,
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
            document.body.style.backgroundColor = '#000000';
            // document.body.style.backgroundImage = 'url( ' + Setting.PATH_IMAGE + 'box.png )';
        }

        /***************************************************************************************************************
        *   Create the runner and start the engine and the renderer.
        ***************************************************************************************************************/
        private runMatterEngine() : void
        {
            const runner:matter.Runner = matter.Runner.create( {} );
            matter.Runner.run( runner, this.engine );
            matter.Render.run( this.render );
        }
    }

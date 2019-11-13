
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
            const group :number = matter.Body.nextGroup( true );
            const catapult :matter.Body = matter.Bodies.rectangle( 400, 520, 320, 20, {} );
            const stack :matter.Composite = matter.Composites.stack(
                250, 255, 1, 6, 0, 0,
                ( x:number, y:number ) :matter.Body => {
                    return matter.Bodies.rectangle( x, y, 30, 30 );
                }
            );

            // this.addBodies();

            // add all bodies and constraints to the world
            matter.World.add( this.world, stack );
            matter.World.add( this.world, catapult );
            matter.World.add( this.world, matter.Bodies.rectangle( 400, 600, 800, 50.5, { isStatic: true } ) );
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


                        sprite: {
                            texture: 'res/image/test.png',
                            xScale:  1.0,
                            yScale:  1.0,
                        }

                    }
                }
            ) );

            matter.World.add( this.world, matter.Bodies.circle( 560, 100, 50, { density: 0.005 } ) );
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

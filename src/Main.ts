
    import * as matter from 'matter-js';

    /*******************************************************************************************************************
    *   The main class that launches the demo application.
    *******************************************************************************************************************/
    export class Main
    {
        /***************************************************************************************************************
        *   Launch the run deno application.
        ***************************************************************************************************************/
        public run() : void
        {
            // create engine, world and renderer
            const engine :matter.Engine = matter.Engine.create();
            const world  :matter.World  = engine.world;
            const render :matter.Render = matter.Render.create(
                {
                    element: document.body,
                    engine: engine,
                }
            );

            // create bodies
            const group :number = matter.Body.nextGroup( true );
            const catapult :matter.Body = matter.Bodies.rectangle( 400, 520, 320, 20, {} );
            const stack :matter.Composite = matter.Composites.stack(
                250, 255, 1, 6, 0, 0,
                ( x:number, y:number ) :matter.Body => {
                    return matter.Bodies.rectangle( x, y, 30, 30 );
                }
            );

            // add all bodies and constraints to the world
            matter.World.add( world, stack );
            matter.World.add( world, catapult );
            matter.World.add( world, matter.Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }) );
            matter.World.add( world, matter.Bodies.rectangle(250, 555, 20, 50, { isStatic: true }) );
            matter.World.add( world, matter.Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group, category: 0, mask: 0 } }) );
            matter.World.add( world, matter.Bodies.circle(560, 100, 50, { density: 0.005 }) );
            matter.World.add( world, matter.Constraint.create(
                {
                    bodyA:     catapult,
                    pointB:    matter.Vector.clone( catapult.position ),
                    stiffness: 1,
                    length:    0
                }
            ) );

            // add mouse control
            const mouse           :matter.Mouse           = matter.Mouse.create( render.canvas );
            const mouseConstraint :matter.MouseConstraint = matter.MouseConstraint.create(
                engine,
                {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false,
                            lineWidth: 1,
                            strokeStyle: 'dashed',
                        },
                        bodyA: null,
                        bodyB: null,
                        pointA: null,
                        pointB: null,
                        length: 0,
                        label: '',
                        damping: 0,
                        type: '',
                        id: 0,
                    }
                }
            );
            matter.World.add( world, mouseConstraint );

            // create the runner and run the engine and the renderer
            const runner:matter.Runner = matter.Runner.create( {} );
            matter.Runner.run( runner, engine );
            matter.Render.run( render );
        }
    }

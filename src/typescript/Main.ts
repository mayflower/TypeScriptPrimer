
    import * as Matter from 'matter-js';

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
            // create engine
            var engine = Matter.Engine.create();
            var world  = engine.world;

            // create renderer
            var render = Matter.Render.create(
                {
                    element: document.body,
                    engine: engine,
                    options: {
                        width: 800,
                        height: 600,
/*
                        showAngleIndicator: true,
                        showCollisions: true,
                        showVelocity: true
*/
                    }
                }
            );

            // run the renderer
            Matter.Render.run( render );

            // create runner
            var runner = Matter.Runner.create( {} );
            Matter.Runner.run(runner, engine);

            // add bodies
            var group = Matter.Body.nextGroup(true);

            var stack = Matter.Composites.stack( 250, 255, 1, 6, 0, 0, ( x:number, y:number ) :Matter.Body => {
                return Matter.Bodies.rectangle(x, y, 30, 30);
            });

            var catapult = Matter.Bodies.rectangle(400, 520, 320, 20, {});

            // add all bodies and constraints to the world
            Matter.World.add( world, stack );
            Matter.World.add( world, catapult );
            Matter.World.add( world, Matter.Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }) );
            Matter.World.add( world, Matter.Bodies.rectangle(250, 555, 20, 50, { isStatic: true }) );
            Matter.World.add( world, Matter.Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group, category: 0, mask: 0 } }) );
            Matter.World.add( world, Matter.Bodies.circle(560, 100, 50, { density: 0.005 }) );
            Matter.World.add( world, Matter.Constraint.create({
                bodyA: catapult,
                pointB: Matter.Vector.clone(catapult.position),
                stiffness: 1,
                length: 0
            }) );

            // add mouse control
            var mouse = Matter.Mouse.create(render.canvas);
            var mouseConstraint = Matter.MouseConstraint.create(
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
            Matter.World.add( world, mouseConstraint );
        }
    }

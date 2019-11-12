
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
            // reference LIBs!! PRUNE!

            var Engine = Matter.Engine;
            var Render = Matter.Render;
            var Runner = Matter.Runner;
            var Composites = Matter.Composites;
            var Constraint = Matter.Constraint;
            var MouseConstraint = Matter.MouseConstraint;
            var Mouse = Matter.Mouse;
            var World = Matter.World;
            var Bodies = Matter.Bodies;
            var Body = Matter.Body;
            var Vector = Matter.Vector;

            // create engine
            var engine = Engine.create();
            var world  = engine.world;

            // create renderer
            var render = Render.create(
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
            Render.run( render );

            // create runner
            var runner = Runner.create( {} );
            Runner.run(runner, engine);

            // add bodies
            var group = Body.nextGroup(true);

            var stack = Composites.stack( 250, 255, 1, 6, 0, 0, ( x:number, y:number ) :Matter.Body => {
                return Bodies.rectangle(x, y, 30, 30);
            });

            var catapult = Bodies.rectangle(400, 520, 320, 20, {});

            // add all bodies and constraints to the world
            World.add( world, stack );
            World.add( world, catapult );
            World.add( world, Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }) );
            World.add( world, Bodies.rectangle(250, 555, 20, 50, { isStatic: true }) );
            World.add( world, Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group, category: 0, mask: 0 } }) );
            World.add( world, Bodies.circle(560, 100, 50, { density: 0.005 }) );
            World.add( world, Constraint.create({
                bodyA: catapult,
                pointB: Vector.clone(catapult.position),
                stiffness: 1,
                length: 0
            }) );

            // add mouse control
            var mouse = Mouse.create(render.canvas);
            var mouseConstraint = MouseConstraint.create(
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
            World.add( world, mouseConstraint );
        }
    }

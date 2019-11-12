
    import * as Matter from 'matter-js';

    /*******************************************************************************************************************
    *   The main class that launches the demo application.
    *******************************************************************************************************************/
    export class Main
    {
        /***************************************************************************************************************
        *   Launch the run deno application.
        ***************************************************************************************************************/
        public run() : any
        {
            var Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                Composites = Matter.Composites,
                Constraint = Matter.Constraint,
                MouseConstraint = Matter.MouseConstraint,
                Mouse = Matter.Mouse,
                World = Matter.World,
                Bodies = Matter.Bodies,
                Body = Matter.Body,
                Vector = Matter.Vector;

            // create engine
            var engine = Engine.create(),
                world = engine.world;

            // create renderer
            var render = Render.create({
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
            });

            Render.run(render);

            // create runner
            var runner = Runner.create( {} );
            Runner.run(runner, engine);

            // add bodies
            var group = Body.nextGroup(true);

            var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
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
            var mouseConstraint = MouseConstraint.create(engine, {
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

                });
            World.add( world, mouseConstraint );


            // keep the mouse in sync with rendering
        /*
            render.mouse = mouse;
        */
            // fit the render viewport to the scene
        /*
            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: 800, y: 600 }
            });
        */
            // context for MatterTools.Demo
            return {
                engine: engine,
                runner: runner,
                render: render,
                canvas: render.canvas,
                stop: () :void => {
                    Matter.Render.stop(render);
                    Matter.Runner.stop(runner);
                }
            };
        }
    }

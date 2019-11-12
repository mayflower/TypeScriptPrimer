
    import * as Matter from 'matter-js';

    /**
    *   Demonstrates the usage of the MatterJS engine.
    */
    export class MatterJsDemo
    {
        /** The width and height for one movable box. */
        private static  readonly    BOX_SIZE        :number     = 80;

        /**
        *   Represents the entry point to our MatterJs demo.
        *   This method creates a new MatterJs engine, adds two boxes along
        *   with a static ground and starts the MatterJs physics simulation.
        */
        public static run() : void
        {
            const engine :Matter.Engine = Matter.Engine.create( document.body );

            const boxA   :Matter.Body   = Matter.Bodies.rectangle( 400, 200, MatterJsDemo.BOX_SIZE,  MatterJsDemo.BOX_SIZE );
            const boxB   :Matter.Body   = Matter.Bodies.rectangle( 450, 50,  MatterJsDemo.BOX_SIZE,  MatterJsDemo.BOX_SIZE );
            const ground :Matter.Body   = Matter.Bodies.rectangle( 400, 610, 810, 60, { isStatic: true } );

            // add all bodies to the engine's world
            Matter.World.add
            (
                engine.world,
                [
                    boxA,
                    boxB,
                    ground,
                ]
            );

            // start the MatterJS simulation
            Matter.Engine.run( engine );
        }
    }

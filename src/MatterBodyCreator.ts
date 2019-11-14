
    import * as matter from 'matter-js';
    import { Setting } from './Setting';

    /*******************************************************************************************************************
    *   Offers static functionality for creating matter.js body objects.
    *******************************************************************************************************************/
    export abstract class MatterBodyCreator
    {
        /***************************************************************************************************************
        *   Create a matter.js body with the specified params.
        *
        *   @param x       Center point x of the rectangle.
        *   @param y       Center point y of the rectangle.
        *   @param width   Width  of the rectangle.
        *   @param height  Height of the rectangle.
        *   @param imgFile The filename of the image to use to decorate this body.
        ***************************************************************************************************************/
        public static createRectangle( x:number, y:number, width:number, height:number, imgFile:string ) : matter.Body
        {
            return matter.Bodies.rectangle(
                x,
                y,
                width,
                height,
                {
                    isSensor: true,
                    isStatic: true,
                    render: {
                        sprite: {
                            texture: Setting.PATH_IMAGE + imgFile,
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );
        }
    }

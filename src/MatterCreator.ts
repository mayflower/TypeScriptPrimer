
    import * as matter from 'matter-js';
    import { Setting } from './Setting';
    import { IsCollidable, IsStatic } from './MatterEnums';

    /*******************************************************************************************************************
    *   Offers static functionality for creating matter.js body objects.
    *******************************************************************************************************************/
    export abstract class MatterCreator
    {
        /***************************************************************************************************************
        *   Create a matter.js body with the specified params.
        *
        *   @param x            Center point x of the rectangle.
        *   @param y            Center point y of the rectangle.
        *   @param width        Width  of the rectangle.
        *   @param height       Height of the rectangle.
        *   @param imgFile      The filename of the image to use to decorate this body.
        *   @param isStatic     Specifies if the rectangle has a fixed position and will never move.
        *   @param isCollidable Specifies if the rectangle collides with other bodies.
        ***************************************************************************************************************/
        public static createRectangle(
            x            :number,
            y            :number,
            width        :number,
            height       :number,
            imgFile      :string,
            isStatic     :IsStatic,
            isCollidable :IsCollidable
        )
        : matter.Body
        {
            return matter.Bodies.rectangle(
                x,
                y,
                width,
                height,
                {
                    isStatic: ( isStatic     === IsStatic.YES    ),
                    isSensor: ( isCollidable === IsCollidable.NO ),
                    render: {
                        sprite: {
                            texture: ( Setting.PATH_IMAGE + imgFile ),
                            xScale:  1.0,
                            yScale:  1.0,
                        }
                    }
                }
            );
        }
    }

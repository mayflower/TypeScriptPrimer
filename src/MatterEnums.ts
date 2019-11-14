
    /*******************************************************************************************************************
    *   Specifies if a body has a fixed position and is therefore not movable.
    *******************************************************************************************************************/
    export enum IsStatic
    {
        /** Body is movable. */
        NO,
        /** Body is fixed. */
        YES,
    }

    /*******************************************************************************************************************
    *   Specifies if a body can collide with other bodies.
    *******************************************************************************************************************/
    export enum IsCollidable
    {
        /** Body is not collidable. */
        NO,
        /** Body collides with other bodies. */
        YES,
    }

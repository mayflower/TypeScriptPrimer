
    import { Setting } from './Setting';
    import { MatterDemo } from './MatterDemo';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // compose app title name
        const title:string = ( Setting.APP_TITLE + ', ' + Setting.APP_COPYRIGHT );

        // assign document title and acclaim debug console
        document.title = title;
        console.log( 'Welcome to [' + title + ']' );

        // create and launch the Catapult demo
        const main:MatterDemo = new MatterDemo();


        // const test:String = "My String";
        // console.log( test.toLocaleLowerCase() + MatterDemo.start2 );


        main.start();
    };

    /*******************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };

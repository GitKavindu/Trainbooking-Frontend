export class DeviceService{
    screenWidth={value:0}

    constructor(){
        this.screenWidth.value=window.innerWidth
        var screenSize=this.screenWidth

        window.addEventListener('resize', function(event) {
            const newScreenWidth = window.innerWidth;
            if (newScreenWidth !== screenSize.value) {
                screenSize.value = newScreenWidth;
    
            }
            return screenSize
        });
    }
    getScreenSize():number{
        return this.screenWidth.value
    }
    
}
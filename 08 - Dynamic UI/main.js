let allPoints = [];
let index = 1;

// Callback נקרא בעקבות לחיצה על הכפתור 
function createPoint() {
    // יצירת אובייקט
    let point = {
        id: index,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
    };
    // תחזוקת משתנה שלמעשה מצביע על כמות האובייקטים שיצרנו עד כה במערך
    index++;
    // הכנסת האובייקט למערך האובייקטים
    allPoints.push(point);

    // קריאה לפונקציית ההצגה
    displayPoints();
}

function displayPoints() {
    // קבלת מצביע ל - 
    // div הראשי
    let container = document.getElementById("container");

    // מחיקת כל המידע שנמצא בתוך ה - container (init)
    container.innerHTML = "";

    // בפועל - המידע על כל הנקודות נשמר בצד במערך
    // הצגת האיברים מחדש, דורשת ריצה על איברי המערך ויצרי
    // ויצירה שלהם מחדש
    for (let i = 0; i < allPoints.length; i++) {
        // יצירת אלמנט מסוג div
        // אלמנט שאמור להשתלב ב DOM
        // בפועל - המלבן הצהוב
        let div = document.createElement("div");

        // הכנסת html 
        // אל תוך ה - div
        // על בסיס המידע שנשמר בתוך המערך 
        // האובייקטים
        div.innerHTML = "X: " + allPoints[i].x + "<br>Y: " + allPoints[i].y;

        // יצירת אלמנט שיכיל תמונה של 
        // - מעיין כפתור סגירה של המלבן
        // ציור של X
        let closeIcon = document.createElement("img");

        // חיבור בין קובץ התמונה לתכונת האייקון שיצטייר
        closeIcon.src = "./assets/images/x.png";

        // שתילת id
        // של אובייקט ספציפי מהמערך
        // כשברגע שהמשתמש יחליט למחוק DIV
        // ניתן יהיה לרוץ על המערך, ובאמצעות ה - id
        // לזהות בדיוק את מי נרצה למחוק
        closeIcon.id = allPoints[i].id;

        // הכנסת פונקציית callback ששמה deletePoint
        // אל תוך attribute 
        // onclick הקובע מה יורץ לאחר לחיצה על כפתור
        // ה - X
        //closeIcon.onclick = deletePoint;
        closeIcon.onclick = function () {
            for (let i = 0; i < allPoints.length; i++) {
                if (allPoints[i].id == this.id) {
                    allPoints.splice(i, 1);
                }
                displayPoints();
            }
        }

        

        // הפקודה שמחברת בין האלמנט שמכיל מלבן צהוב, לאלמנט שמכיל את המידע על הנקודות
        div.appendChild(closeIcon);

        // חיבור בין אלמנט ה - container
        // לאלמנט המלבן הצהוב
        container.appendChild(div);
    }
}

/*
function deletePoint() {
    for (let i = 0; i < allPoints.length; i++) {
        if (allPoints[i].id == this.id) {
            allPoints.splice(i, 1);
        }
    }
    displayPoints();
}*/

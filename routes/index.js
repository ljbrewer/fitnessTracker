

app.get("/", (req, res) => {
    res.sendfile(path.join(_dirname,"public",index.html))
});

app.get("/exercise",(req,res)=> {
    res.sendfile(path.join(_dirname,"public","exercise.html"))
});

app.get("/exercise",(req,res)=> {
    res.sendfile(path.join(_dirname,"public","stats.html"))
});

//API Routes
app.get("api/workouts", async (req,res) =>{
    try{
        const workout=await Workout.find().sort({day:-1}).limit(1)

        res.json(workout)
    } catch(err) {
        console.log(err)
        res.json(err)
    }
});

app.post("/api/workouts",(reqq,res)=>{
    Workout.create(req.body)
    .then(dbworkout =>{
        res.json(dbworkout)
    }).catch (err => res.json(err))
})

app.put("api/workouts/:id",(req,res)=>{
    Workout.updateOne({_id:req.params.id},{
        $push: {exercises: req.body}
    })
    .then(dbworkout =>{
        res.json(dbworkout)   
    }).catch(err => res.json(err))
})
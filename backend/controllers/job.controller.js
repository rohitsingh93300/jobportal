import { Job } from "../models/job.model.js";

// admin host krega job
export const postJob = async(req, res) => {
    try {
        const {title, description, requirement, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if(!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status({
                message:"Something is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirement.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position:position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job created successfully",
            job, 
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


//student k liye
export const getAllJobs = async(req,res) => {
    try {
       
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success: false
            })
        }
        return res.status(200).json({ job, success:true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitene job create kra hai abhi tak 
export const getAdminJobs = async (req, res) => {
    try {
        const adminId =req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company"
        }).populate({
            path:"created_by"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs, 
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
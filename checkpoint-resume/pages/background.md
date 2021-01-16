### Background

Not long after I started at Response Services Incorporated, I was put in charge of a project that overhauled an important part of our system. I cannot go into specific details but essentially, we had a large form with around 7500 submissions. The submissions were then parsed and written into a single spreadsheet. This may have been okay at first but overtime, the spreadsheet became cluttered, disorganized, and very cumbersome for staff members to use in their everyday tasks.

This project was set about to overhaul how these form submissions are handled so that the data is easier to use and manage. The solution my boss and I agreed on is that the form submissions are split into individual sheets by a certain field. First, I wrote a script to handle form submissions accordingly, and then I expanded it to loop through pre-existing submissions, process them from scratch, and 'migrate' them into their corresponding spreadsheet.

After I wrote the migration script, I thought it was a simple matter of hitting the 'run' button, doing something else for a while, and then coming back to see everything migrated good as new. However, I was greeted with a timeout error message. What I learned that afternoon is that scripts can only run for up to [six minutes](https://developers.google.com/apps-script/guides/services/quotas#current_limitations) before terminating.

Of course, I was quite surprised. Even my boss was a little taken aback. After taking some time to think it over, I came up with an idea to get around this limit. I revised the form submission loop to remember the start time, check the current time every iteration, and abort the loop after a certain amount of time has passed. After the form submission loop, the current submission index would be written to a separate 'checkpoint' spreadsheet. That way, the next time the script is run, the saved index can be read from the checkpoint and the submission loop can continue where it left off. I then spent the rest of that afternoon hanging out around the office, checking my script every 10 minutes or so to handle the next group of form submissions.

I cannot remember the exact time limit I chose for this loop, but as of writing now, I recommend 4m 30s. This should allow enough time for the script to execute before and after the core loop.

While the script time limit was a hard lesson, I actually think it was quite reasonable all things considered. Putting aside the fact that Google Drive is a cloud computing service, the scripting system was not designed for huge batch tasks like the one I was put in charge of. It was made for quick and easy tasks involving relatively little data. In this case, a script handling a single submission would be reasonable. However, processing many submissions at once is not what the design intent was - at least not without workarounds. That said, I think six minutes is *more* than enough for the *overwhelming* majority of use cases. I can't imagine many (free) cloud providers being that lenient with their services. However, this is Google we are talking about. They could very well afford to enable higher quotas if they chose to. However, that is another story.

Even though this migration script was a big job, I feel like I could have written the script more efficiently in hindsight. I was still relatively new to the platform and I did not know how to optimize scripts for runtime. I cannot cite anything specific but the general rule in our office was that quick, dirty code was preferable to slow, beautiful code. I still prefer to write things as cleanly as possible but if I were to do the whole thing again, I feel like I could write it to favour time over form. Even then, I imagine processing ~7500 submissions for such a large form in a few minutes would be nigh-impossible no matter how you choose to write it. It isn't a question of whether you can do it all at once, it would be how many you can handle in a single batch. I don't remember the exact numbers but I believe my script could handle 400-500 form submissions at a time.

In conclusion, this all started out when I was asked to overhaul how submissions for a large form are processed and stored. In addition to future submissions, I also had to migrate the pre-existing submissions according to the new standard. There was no way to process them all in a single execution so I revised my script to include checkpoints in order to save and resume progress. I am definitely not the first/only person to write my Google Drive scripts like this but it was still an important part of my work as a programmer at Response Services Incorporated. This experience is something I wanted to share and I hope that it may serve as inspiration to other programmers in a similar position.

---

[Scenario](./scenario.md)

[Return to Index](../index.md)
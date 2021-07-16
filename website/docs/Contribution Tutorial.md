---
id: Contribution_Guidelines
title: Contribution Tutorial
sidebar_label: Contribution Tutorial
---


Thank you for considering contributing to the Alaya document library. It is the talents like you that push the Alaya technical community forward.

This guide will show you how to find an issue, fix it, and submit it to the Github document repository.

At present, there may be many small issues in the Alaya document library. Fixing these issues is easy and also helpful for the Alaya project.

We will introduce the process step by step:

1. Find an issue

2. Discuss an issue

3. Fix an issue

4. Submit a Pull request

5. Wait for review

6. Merge your fixes

Troublesome the above steps may seem, they are necessary to ensure the standard and quality of the document. 



## Find An Issue

The Alaya documentation library is hosted in [Github](https://github.com/AlayaNetwork/alaya-devdocs), and the answer to all issuess of the documentation can be found under the [Issue] tab of `AlayaNetwork/alaya-devdocs`. Here you can see all the open issues. The maintainer of the Repo will try to add descriptive tags to each issue. You can get to know the difficulty of the issue through the tags and select those that can be fixed. You can also submit a new "Issue" under [Issue] in `AlayaNetwork/alaya-devdocs` for any issues found while reading and using Alaya documents.

To find an issue:

1. Enter the Github Alaya document library https://github.com/AlayaNetwork/alaya-devdocs

2. Select the [**Issue**] tab.

3. Click **[Label]** drop-down menu and select **"help wanted"** label.

4. Choose an issue that interests you.



## Discuss An Issue

Different issues require varying degrees of changes. Issues with small changes may need no, or very little, discussion. However, if code needs to be rewritten, which is a major change, full discussion is necessary before all members in the project team can reach an agreement. 

Please note that it may take days or weeks to end a discussion on an issue. So try to include all relevant information that the associated person may need in each piece of information.

Join the discussion:

1. Read through all previous posts to quickly brief yourself on the issue.

2. Add any comments you think necessary.

3. If you want to solve this issue, please post a message stating that you want to fix it.

Once you indicate your willingness to fix, the maintainer of this Repo will assign this issue to you. For some major issue fixes, the core team of the community will communicate with you to ensure that you can solve it smoothly.



## Create A Fix

If you already have a basic idea and solution to the issue you want to solve, then you can implement your fix.

The process is roughly as below:

1. Fork Alaya document library https://github.com/AlayaNetwork/alaya-devdocs

2. Make changes on the local branch of Fork.

3. Push your changes.

Fork is a personal copy of the project. You can make any changes to this copy at any time and submit your changes to the project maintainer to review and merge your changes.

The following shows steps of creating an Alaya document branch:

1. Go to the `AlayaNetwork/alaya-devdocs` repository on [GitHub](https://github.com/AlayaNetwork/alaya-devdocs).

2. Select "**Fork**" to create a copy of the project.

3. Clone a copy of the project to the local computer:

   ```shell
   git clone https://github.com/YOUR_USERNAME/alaya-devdocs.git    
   ```

4. Make document changes on the local computer.

5. After making all the changes, make sure to push everything back to GitHub:

   ```shell
   git add .
   git commit -m "What's fixed, issue #ID."
   git push
   ```

Note: When submitting a fix, remember to provide a summary description of the fixed issue and quote the issue number, so that others can quickly see what you have done.



## Create A Pull Request

Once you're done making commits, and are ready to get a core team member's review of your work, it's time to create a pull request.

Once you have submitted a fix and have it reviewed by the maintainer of the Repo, you can create a pull request.

1. Go to the `AlayaNetwork/alaya-devdocs` repository on [GitHub](https://github.com/AlayaNetwork/alaya-devdocs).
2. Select the [**Pull requests**] tab.
3. Click "**New pull request**".
4. Click "**compare across forks**" and select your repository from the **Main Repository** drop-down list.
5. Leave your submission instructions for the pull request.
6. Click "**Create pull request**".



GitHub will check if your changes have any conflicts with the branch you are trying to merge into.



## Wait for Review

All pull requests from the community must be reviewed by at least one core community member before being merged. Depending on the size of the pull request, the review may take several minutes to several days. At the same time, depending on the complexity of the pull request, a further communication and modification may be required.



## Merge Your Fix

Once your pull request is approved, the Repo maintainer will complete the merger, and after that, you will receive a Github notification.



## Start to Contribute

We are always looking for great writers and educators to help us improve Alaya documentation and make Alaya better for everyone. Start your first contribution!



### Contact

In case of problems, you can ask for support at [Discord](https://discord.gg/jAjFzJ3Cff) or [Forum](https://forum.latticex.foundation/).
